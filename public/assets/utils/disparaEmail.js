const nodemailer = require("nodemailer")

async function disparaEmail(dados) {
    const { email, assunto, texto } = dados;

    let transporter = nodemailer.createTransport({
        // SMTP padrão dos email do tipo gmail
        host: "smtp.gmail.com", 
    
        // Porta padrão do gmail
        port: 465, 
    
        // gmail utiliza true, mas verifique se o seu tipo de email utiliza também
        secure: true, 
    
        auth: {
            // Coloque o seu email aqui
            user: "suporte.droflix@gmail.com", 
    
            // Coloque a senha do seu email aqui
            pass: "bvyjuevjgzzejvlv" 
        }
    })

    try {
        const response = await transporter.sendMail({
            // Coloque aqui o seu nome e email
            from: `Suporte Droflix <suporte.droflix@gmail.com>`, 
        
            // Email do destinatário
            to: `${email}`, 
        
            // Assunto
            subject: `${assunto}`, 
        
            // Texto html (não obrigatório)
            html: `${texto}`
        })

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = disparaEmail;