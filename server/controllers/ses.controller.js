// load aws sdk
var aws = require('aws-sdk');

// load aws config
aws.config.loadFromPath('aws.config.json');

// load AWS SES
var ses = new aws.SES({apiVersion: '2010-12-01'});
 
exports.send=function(req,res){
    console.log("send");
    const senderName=req.body.senderName;
    const recipientEmail=req.body.recipientEmail;
    const letterId=req.body.letterId;
    const link='https://localhost:4200/view/'+letterId;

    // to and from
    console.log(senderName);
    console.log(recipientEmail);
    console.log(link);
    console.log(req.body);
    var to = [recipientEmail];
    var from = 'theletterdesk@gmail.com';

    // send email (look into html)
    ses.sendEmail( { 
        Source: from, 
        Destination: { ToAddresses: to },
        Message: {
            Subject: {
                Data: senderName+' has sent you a letter, delivered by The Letter Desk'
            },
            Body: {
                Text: {
                    Data: 'You have recieved a letter from '+senderName+'! Go to The Letter Desk to open it!\n'+link,
                }
            }
        }
    },function(err, data) {
        if(err){
            res.json(err);
        }else{
            res.json({success: true});
        }
        console.log('email sent:');
        console.log(data);
    });
}