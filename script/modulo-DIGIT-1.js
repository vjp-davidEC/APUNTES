        (function() {
            try {
                if (localStorage.getItem('tema_apuntes') === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                }
            } catch(e) {}
        })();
    
