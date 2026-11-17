param(
    [int]$Port = 8090
)

$ErrorActionPreference = 'Stop'
$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

Add-Type -AssemblyName System.Web

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Servidor Admin APUNTES activo en:" -ForegroundColor Cyan
Write-Host " http://localhost:$Port/admin.html" -ForegroundColor Green
Write-Host " No cierres esta ventana mientras uses admin.html" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

function Send-JsonResponse($response, $obj, [int]$statusCode = 200) {
    $json = $obj | ConvertTo-Json -Depth 5 -Compress
    $bytes = $Utf8NoBom.GetBytes($json)
    $response.StatusCode = $statusCode
    $response.ContentType = "application/json; charset=utf-8"
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
    $response.OutputStream.Close()
}

function Read-RequestBody($request) {
    $reader = New-Object System.IO.StreamReader($request.InputStream, $Utf8NoBom)
    $body = $reader.ReadToEnd()
    $reader.Close()
    return $body
}

function Get-MimeType([string]$ext) {
    switch ($ext.ToLower()) {
        ".html" { return "text/html; charset=utf-8" }
        ".htm"  { return "text/html; charset=utf-8" }
        ".css"  { return "text/css; charset=utf-8" }
        ".js"   { return "application/javascript; charset=utf-8" }
        ".json" { return "application/json; charset=utf-8" }
        ".pdf"  { return "application/pdf" }
        ".jpg"  { return "image/jpeg" }
        ".jpeg" { return "image/jpeg" }
        ".png"  { return "image/png" }
        ".svg"  { return "image/svg+xml" }
        ".ico"  { return "image/x-icon" }
        ".txt"  { return "text/plain; charset=utf-8" }
        default { return "application/octet-stream" }
    }
}

function Remove-SingleLi([string]$html, [scriptblock]$matchHref) {
    $script:eliminado = $false
    $pattern = '(?is)[ \t]*<li class="pdf-item">(?:(?!</li>).)*?</li>[ \t]*\r?\n?'
    $nuevo = [regex]::Replace($html, $pattern, {
        param($m)
        $bloque = $m.Value
        $hm = [regex]::Match($bloque, '(?i)href=["'']([^"'']+)["'']')
        if ($hm.Success -and (& $matchHref $hm.Groups[1].Value)) {
            $script:eliminado = $true
            return ''
        }
        return $bloque
    })
    return @{ nuevoHtml = $nuevo; eliminado = $script:eliminado }
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        try {
            $rawPath = $request.Url.AbsolutePath
            $relPath = [System.Uri]::UnescapeDataString($rawPath).TrimStart('/')

            if ($rawPath -eq "/api/ping" -and $request.HttpMethod -eq "GET") {
                Send-JsonResponse $response @{ ok = $true }
                continue
            }

            if ($rawPath -eq "/api/publicar" -and $request.HttpMethod -eq "POST") {
                $body = Read-RequestBody $request
                $data = $body | ConvertFrom-Json

                $modulo = ($data.modulo -replace '[^A-Za-z0-9_-]', '')
                $titulo = [string]$data.titulo
                $enlace = [string]$data.enlace
                $tipo   = [string]$data.tipo

                if (-not $modulo -or -not $titulo -or -not $enlace) {
                    Send-JsonResponse $response @{ ok = $false; error = "Faltan datos obligatorios." } 400
                    continue
                }

                # 1. Guardar fichero fisico en modulos/<MODULO>/Temas-<MODULO>/
                if ($data.fileName -and $data.fileBase64) {
                    $safeFileName = [System.IO.Path]::GetFileName([string]$data.fileName)
                    $temasDir = Join-Path $RootDir "modulos\$modulo\Temas-$modulo"
                    if (-not (Test-Path $temasDir)) {
                        Send-JsonResponse $response @{ ok = $false; error = "No existe la carpeta $temasDir" } 404
                        continue
                    }
                    $destFile = Join-Path $temasDir $safeFileName
                    $fileBytes = [System.Convert]::FromBase64String([string]$data.fileBase64)
                    [System.IO.File]::WriteAllBytes($destFile, $fileBytes)
                }

                # 2. Insertar <li> en index.html principal
                $indexPath = Join-Path $RootDir "index.html"
                $htmlText = [System.IO.File]::ReadAllText($indexPath, $Utf8NoBom)
                $escapedEnlace = [regex]::Escape($enlace)
                $alreadyExists = [regex]::IsMatch($htmlText, "(?i)href=[""']$escapedEnlace[""']")

                if (-not $alreadyExists) {
                    $indent = "                "
                    $bloqueLi = "$indent<li class=`"pdf-item`">`r`n$indent    <a href=`"$enlace`">`r`n$indent        <span>$titulo</span>`r`n$indent        <span class=`"pdf-tag`">$tipo</span>`r`n$indent    </a>`r`n$indent</li>"
                    $escapedMod = [regex]::Escape($modulo)
                    $secPattern = "(?is)(<section[^>]*data-module=[""']$escapedMod(?:\s[^""']*)?[""'].*?<ul class=[""']pdf-list[""']>.*?)([ \t]*</ul>)"
                    if (-not [regex]::IsMatch($htmlText, $secPattern)) {
                        Send-JsonResponse $response @{ ok = $false; error = "No se encontro la seccion $modulo en index.html" } 404
                        continue
                    }
                    $updatedHtml = [regex]::Replace($htmlText, $secPattern, {
                        param($m)
                        return $m.Groups[1].Value + $bloqueLi + "`r`n" + $m.Groups[2].Value
                    }, [System.Text.RegularExpressions.RegexOptions]::None)
                    [System.IO.File]::WriteAllText($indexPath, $updatedHtml, $Utf8NoBom)
                }

                # 3. Insertar <li> en modulos/<MODULO>/index.html
                $modActualizado = $false
                $modIndexPath = Join-Path $RootDir "modulos\$modulo\index.html"
                if (Test-Path $modIndexPath) {
                    $modHtml = [System.IO.File]::ReadAllText($modIndexPath, $Utf8NoBom)
                    $enlaceMod = if ($data.fileName) { "./Temas-$modulo/$([System.IO.Path]::GetFileName([string]$data.fileName))" } else { $enlace -replace "^\./modulos/$modulo/", "./" }
                    $escModEnlace = [regex]::Escape($enlaceMod)
                    if (-not [regex]::IsMatch($modHtml, "(?i)href=[""']$escModEnlace[""']")) {
                        $bloqueModLi = "            <li class=`"pdf-item`"><a href=`"$enlaceMod`"><span>$titulo</span><span class=`"pdf-tag`">$tipo</span></a></li>"
                        $modPattern = '(?is)(<ul class=["'']pdf-list["'']>.*?)([ \t]*</ul>)'
                        if ([regex]::IsMatch($modHtml, $modPattern)) {
                            $rxMod = New-Object System.Text.RegularExpressions.Regex($modPattern)
                            $nuevoModHtml = $rxMod.Replace($modHtml, {
                                param($m)
                                return $m.Groups[1].Value + $bloqueModLi + "`r`n" + $m.Groups[2].Value
                            }, 1)
                            [System.IO.File]::WriteAllText($modIndexPath, $nuevoModHtml, $Utf8NoBom)
                            $modActualizado = $true
                        }
                    } else {
                        $modActualizado = $true
                    }
                }

                Send-JsonResponse $response @{
                    ok = $true
                    alreadyExists = $alreadyExists
                    modActualizado = $modActualizado
                }
                continue
            }

            if ($rawPath -eq "/api/eliminar" -and $request.HttpMethod -eq "POST") {
                $body = Read-RequestBody $request
                $data = $body | ConvertFrom-Json
                $href = [string]$data.href
                $moduloTarget = ($data.modulo -replace '[^A-Za-z0-9_-]', '')

                if (-not $href) {
                    Send-JsonResponse $response @{ ok = $false; error = "Falta href" } 400
                    continue
                }

                # 1. Quitar solo ese <li> de index.html principal
                $indexPath = Join-Path $RootDir "index.html"
                $htmlText = [System.IO.File]::ReadAllText($indexPath, $Utf8NoBom)
                $targetNorm = [System.Uri]::UnescapeDataString($href).Trim()

                $resPrincipal = Remove-SingleLi $htmlText {
                    param($hrefActual)
                    $dec = [System.Uri]::UnescapeDataString($hrefActual).Trim()
                    return ($hrefActual.Trim() -eq $href.Trim()) -or ($dec -eq $targetNorm)
                }

                $quitadoPrincipal = $false
                if ($resPrincipal.eliminado) {
                    [System.IO.File]::WriteAllText($indexPath, $resPrincipal.nuevoHtml, $Utf8NoBom)
                    $quitadoPrincipal = $true
                }

                # 2. Quitar solo ese <li> de modulos/<MODULO>/index.html
                $cleanHref = $href -replace '^\./', ''
                $fileName = [System.Uri]::UnescapeDataString(($cleanHref -split '/')[-1])
                $modulosActualizados = 0

                $modulosBase = Join-Path $RootDir "modulos"
                $modDirs = @()
                if ($moduloTarget -and (Test-Path (Join-Path $modulosBase $moduloTarget))) {
                    $modDirs += Get-Item (Join-Path $modulosBase $moduloTarget)
                } else {
                    $modDirs = Get-ChildItem -Path $modulosBase -Directory
                }

                foreach ($dir in $modDirs) {
                    $modIndexPath = Join-Path $dir.FullName "index.html"
                    if (Test-Path $modIndexPath) {
                        $modHtml = [System.IO.File]::ReadAllText($modIndexPath, $Utf8NoBom)
                        $resMod = Remove-SingleLi $modHtml {
                            param($hrefActual)
                            $dec = [System.Uri]::UnescapeDataString($hrefActual).Trim()
                            $fileActual = ($dec -split '/')[-1]
                            return ($hrefActual.Trim() -eq $href.Trim()) -or ($fileName -ne '' -and $fileActual -eq $fileName)
                        }
                        if ($resMod.eliminado) {
                            [System.IO.File]::WriteAllText($modIndexPath, $resMod.nuevoHtml, $Utf8NoBom)
                            $modulosActualizados++
                        }
                    }
                }

                # 3. Eliminar fichero fisico si es local
                $archivoEliminado = $false
                if ($href -notmatch '^https?://') {
                    $relWin = ([System.Uri]::UnescapeDataString($cleanHref)) -replace '/', '\'
                    $fullTarget = [System.IO.Path]::GetFullPath((Join-Path $RootDir $relWin))
                    if ($fullTarget.StartsWith($RootDir, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path $fullTarget -PathType Leaf)) {
                        Remove-Item -LiteralPath $fullTarget -Force
                        $archivoEliminado = $true
                    }
                }

                Send-JsonResponse $response @{
                    ok = $true
                    quitadoPrincipal = $quitadoPrincipal
                    modulosActualizados = $modulosActualizados
                    archivoEliminado = $archivoEliminado
                    fileName = $fileName
                }
                continue
            }

            # Servir archivos estaticos
            if ([string]::IsNullOrWhiteSpace($relPath)) { $relPath = "index.html" }
            $winRel = $relPath -replace '/', '\'
            $fullPath = [System.IO.Path]::GetFullPath((Join-Path $RootDir $winRel))

            if (-not $fullPath.StartsWith($RootDir, [System.StringComparison]::OrdinalIgnoreCase)) {
                $response.StatusCode = 403
                $response.OutputStream.Close()
                continue
            }

            if (Test-Path $fullPath -PathType Container) {
                $fullPath = Join-Path $fullPath "index.html"
            }

            if (Test-Path $fullPath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($fullPath)
                $response.ContentType = Get-MimeType $ext
                $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                $response.StatusCode = 200
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.OutputStream.Close()
            } else {
                $response.StatusCode = 404
                $response.OutputStream.Close()
            }
        } catch {
            Write-Host "Error en peticion: $_" -ForegroundColor Red
            try {
                Send-JsonResponse $response @{ ok = $false; error = $_.Exception.Message } 500
            } catch {}
        }
    }
} finally {
    $listener.Stop()
}
