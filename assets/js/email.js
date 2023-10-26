

    //update this with your js_form selector
    const form_id_js = "javascript_form";

    const data_js = {
        "access_token": "hib84tbt5ri69mzd5bvutj1t" // sent after you sign up
    };

    const reponse_mail=document.querySelector("[data-mail-response]");
    

    function js_onSuccess() {
        // remove this to avoid redirect
        // window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";

        reponse_mail.innerHTML=`<p>&#128522; J'ai bien reçu votre courriel et je vous remercie pour 
        le temps que vous avez consacré à l'examen de mon profil depuis mon site internet…Avec mes remerciements, 
        je vous prie d'agréer l'expression de mes sentiments 
        respectueux.</p>`;

        reponse_mail.style.color="#3a81eb";
    }

    function js_onError(error) {
        // remove this to avoid redirect
        // window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
        reponse_mail.innerHTML=`<p> &#128517; Excusez-moi , pourrais-je avoir votre nom ainsi que le contenu de votre message ? S'il-vous-plaît ! Vous pouvez également me joindre directement 
        par messagerie Linkedin ou par téléphone au 0605971397. Merci bien ! &#128521;&#128076;.</p>`;
    }

    const sendButton = document.getElementById("js_send");

    function js_send() {
        sendButton.value='Sending…';
        sendButton.disabled=true;

        
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                js_onSuccess();
                
            } else
            if(request.readyState == 4) {
                js_onError(request.response);

                setTimeout(function(){
                    sendButton.value='Envoyer';
                    sendButton.disabled=false;
                },1000);
            }
        };

        const name = document.querySelector("#" + form_id_js + " [name='name']").value;
        const message = document.querySelector("#" + form_id_js + " [name='message']").value;
        data_js['subject'] = name;
        data_js['text'] = message;
        const params = toParams(data_js);

        request.open("POST", "https://postmail.invotes.com/send", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.send(params);

        return false;
    }

    sendButton.onclick = js_send;

    function toParams(data_js) {
        const form_data = [];
        for ( var key in data_js ) {
            form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
        }

        return form_data.join("&");
    }

    const js_form = document.getElementById(form_id_js);
    js_form.addEventListener("submit", function (e) {
        e.preventDefault();
    });