let sendBtns = document.querySelectorAll('.send-form');

for (const sendBtn of sendBtns) {
    sendBtn.addEventListener('click', function(e){
        e.preventDefault();
        var form = this.closest('.form-letter');

        formSend(form);
    });

    var files = document.querySelectorAll('.file__input');
    var globalFile

    for (const file of files) {
        globalFile = file;
        
        file.addEventListener('change', () => {
            uploadFile(file.files[0]);
            globalFile = file;

        });
    
        function uploadFile(file) {
            if(file.size > 10 * 1024 * 1024) {
                alert('File must be less than 10MB');
                return;
            }
    
            var reader = new FileReader();
            reader.readAsDataURL(file);
        }
        
    }

    async function formSend(form) {
        let error = formValidate(form);

        let formData = new FormData(form);
        // formData.append('file', globalFile.files[0]);

        if( error === 0) {
            let response = await fetch('sendmail/sendmail.php', {
                method: 'POST',
                body: formData
            });

            if(response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            } else {
                alert('Error');
            }
        } else {
            alert('Fill required fields');
        }
    }

    function formValidate(form) {
        let error = 0;
		let formRequiredItems = form.querySelectorAll('*[data-required]');

        for (let index = 0; index < formRequiredItems.length; index++) {
            const input = formRequiredItems[index];
            removeError(input);

            if(input.classList.contains('_email')) {
                if(emailTest(input)){
                    addError(input);
                    error++;
                } 
            } else if (input.type === "checkbox" && !input.checked) {
                addError(input);
                error++;
            } else if(input.classList.contains('_textarea')) {
                if (input.value.length<10) {
                    addError(input);
                    error++;
                }
            } else if (input.classList.contains('_phone')) {
                if (input.value.length<5) {
                    addError(input);
                    error++;
                }
                if (phoneTest(input)) {
                    addError(input);
                    error++;
                }
            }
            else if (input.classList.contains('_text')) {
                if (input.value.length<3) {
                    addError(input);
                    error++;
                }
            } 
        }

        return error
    }

    function addError(input) {
		input.classList.add('is-error');
		input.parentElement.classList.add('is-error');
	}
	function removeError(input) {
		input.classList.remove('is-error');
		input.parentElement.classList.remove('is-error');
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	function phoneTest(input) {
		return !/^[0-9-+()]*$/.test(input.value);
	}
}
