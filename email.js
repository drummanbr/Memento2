<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.luckydroid.droidbase"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk
        android:minSdkVersion="6"
        android:targetSdkVersion="23" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_INTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />


</manifest>
var AndroidMessages = {
/**
    Compose an email with optional attachments
    @param {Array} email - A string array of all "To" recipient email addresses.
    @param {string} subject - A string with the email subject.
    @param {string} text - A string with the body of the email.
    @param {Array} attachments - Array of attachments.
   
    @example
    AndroidMessages.email( entry().field("Email") , "Subject" , 
      "Hello , " + entry().field("Name") +"!\nPlease find attached!",  entry().field("Photos") );
    */  
    email: function(email, subject, text, attachments) {
        i = intent(attachments instanceof Array && attachments.length > 1 ?
            "android.intent.action.SEND_MULTIPLE" : "android.intent.action.SEND");
        i.mimeType("message/rfc822");
        i.extraArrayString("android.intent.extra.EMAIL", email);
        i.extra("android.intent.extra.SUBJECT", subject);
        i.extra("android.intent.extra.TEXT", text);
        if (attachments !== undefined) {
            if (attachments instanceof Array && attachments.length == 1)
                i.extraUri("android.intent.extra.STREAM", attachments[0])
            else i.extraUri("android.intent.extra.STREAM", attachments)
        }
        i.send();
    },
   
/**
    Compose an SMS message
    @param {string} - The phone number
    @param {text} - A string for the text message.
    
    @example
    AndroidMessages.sms("+1555102088" , entry().field("Status"));
    */
    
    sms: function(phone , text) {
        i = intent("android.intent.action.SENDTO" );
	    i.data("smsto:"+phone); 
        i.extra("sms_body", text);	    
	    i.send();
    }    
    
};
