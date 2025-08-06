document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('sign-text');
    const controls = document.getElementById('controls');
    const backgroundButtons = document.querySelectorAll('.background-color-button');
    const fontButtons = document.querySelectorAll('.font-color-button');
    const fullscreenButton = document.getElementById('fullscreen-button');

    function adjustTextSize() {
        const container = document.querySelector('.text-container');
        const containerWidth = container.offsetWidth - (parseInt(getComputedStyle(container).paddingLeft) * 2);
        const containerHeight = container.offsetHeight - (parseInt(getComputedStyle(container).paddingTop) * 2);

        if (textarea.value.trim() === '') {
            textarea.style.height = '30vh';
            textarea.style.fontSize = '2rem';
            return;
        }

        const tempElement = document.createElement('span');
        tempElement.style.visibility = 'hidden';
        tempElement.style.position = 'absolute';
        tempElement.style.whiteSpace = 'pre';
        tempElement.style.fontFamily = getComputedStyle(textarea).fontFamily;
        document.body.appendChild(tempElement);
        
        let fontSize = 150;
        let fitSize = 150;
        
        while (fontSize > 1) {
            tempElement.style.fontSize = fontSize + 'vw';
            tempElement.innerText = textarea.value;
            
            if (tempElement.offsetWidth <= containerWidth && tempElement.offsetHeight <= containerHeight) {
                fitSize = fontSize;
                break;
            }
            fontSize -= 0.1;
        }

        const lines = textarea.value.split('\n').length;
        if (lines > 1) {
             textarea.style.height = 'auto';
             textarea.style.height = textarea.scrollHeight + 'px';
        } else {
            textarea.style.height = tempElement.offsetHeight + 'px';
        }
        
        textarea.style.fontSize = fitSize + 'vw';
        document.body.removeChild(tempElement);
    }
    
    document.body.addEventListener('click', function(event) {
        if (event.target.closest('#controls')) {
            return;
        }
        controls.classList.toggle('controls-hidden');
    });

    backgroundButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newColor = this.dataset.color;
            document.body.style.backgroundColor = newColor;
        });
    });

    fontButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newColor = this.dataset.color;
            document.body.style.color = newColor;
        });
    });

    fullscreenButton.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`フルスクリーンモードに切り替えできませんでした: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    textarea.addEventListener('input', adjustTextSize);
    adjustTextSize();
});
