        function switchTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));

            const targetBtn = document.getElementById(`tab-${tabId}`);
            const targetContent = document.getElementById(`content-${tabId}`);
            if (targetBtn) targetBtn.classList.add('active');
            if (targetContent) targetContent.classList.remove('hidden');
        }

        function copyCode(elementId, btn) {
            const codeEl = document.getElementById(elementId);
            if (!codeEl) return;
            const codeText = codeEl.innerText;
            const textArea = document.createElement("textarea");
            textArea.value = codeText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check text-emerald-600"></i> ¡Copiado!`;
            btn.classList.add('bg-emerald-50', 'text-emerald-700');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('bg-emerald-50', 'text-emerald-700');
            }, 2000);
        }

        const quizAnswers = {
            q1: { correct: "B", exp: "BorderLayout divide el espacio en cinco áreas y es el gestor por defecto de JFrame." },
            q2: { correct: "B", exp: "En el patrón MVC, los datos nunca se agregan al JTable directamente, sino a través del TableModel que notifica el redibujado." },
            q3: { correct: "B", exp: "El Affordance es la cualidad visual intuitiva que insinúa cómo debe accionarse un control interactivo." },
            q4: { correct: "B", exp: "La Ley de Fitts determina que los controles críticos deben ser de gran tamaño y estar cerca del usuario." },
            q5: { correct: "A", exp: "fireTableDataChanged() avisa a los oyentes de la tabla que la estructura de filas ha sido modificada para refrescar la interfaz." }
        };

        function evaluateQuiz() {
            let score = 0;
            const total = Object.keys(quizAnswers).length;

            for (const [key, data] of Object.entries(quizAnswers)) {
                const selected = document.querySelector(`input[name="${key}"]:checked`);
                const card = document.getElementById(`card-${key}`);
                const expBox = card.querySelector('.exp-box');
                expBox.classList.remove('hidden');

                if (selected && selected.value === data.correct) {
                    score++;
                    card.className = "bg-emerald-50 p-5 rounded-xl border border-emerald-300 shadow-sm space-y-3";
                    expBox.innerHTML = `<span class="text-emerald-800 font-bold">¡Correcto!</span> ${data.exp}`;
                } else {
                    card.className = "bg-rose-50 p-5 rounded-xl border border-rose-300 shadow-sm space-y-3";
                    expBox.innerHTML = `<span class="text-rose-800 font-bold">Incorrecto.</span> ${data.exp}`;
                }
            }

            const scoreContainer = document.getElementById('quiz-score');
            const scoreVal = document.getElementById('score-val');
            scoreContainer.classList.remove('hidden');
            scoreVal.innerText = `${score} / ${total}`;
        }

        function resetQuiz() {
            document.querySelectorAll('#quiz-container input[type="radio"]').forEach(radio => radio.checked = false);
            document.querySelectorAll('#quiz-container .exp-box').forEach(box => {
                box.classList.add('hidden');
                box.innerHTML = '';
            });
            document.querySelectorAll('#quiz-container > div').forEach(card => {
                card.className = "bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3";
            });
            document.getElementById('quiz-score').classList.add('hidden');
        }

        // Modo claro / modo oscuro
        function applyTheme(theme) {
            const isDark = theme === 'dark';
            document.documentElement.classList.toggle('dark', isDark);

            const icon = document.getElementById('theme-icon');
            const label = document.getElementById('theme-label');
            const button = document.getElementById('theme-toggle');

            if (icon && label && button) {
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
                label.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
                button.setAttribute(
                    'aria-label',
                    isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
                );
            }
        }

        function toggleTheme() {
            const nextTheme = document.documentElement.classList.contains('dark')
                ? 'light'
                : 'dark';
            applyTheme(nextTheme);
            try {
                localStorage.setItem('psp-theme', nextTheme);
            } catch (e) {
                // La página sigue funcionando aunque el navegador no permita guardar la preferencia.
            }
        }

        // Recuperar la preferencia guardada; por defecto se usa el modo claro.
        try {
            applyTheme(localStorage.getItem('psp-theme') || 'light');
        } catch (e) {
            applyTheme('light');
        }
    
