var fs = require('fs')
  , _ = require('underscore')
  , yaml = require('js-yaml')
  , config = require(__dirname + '/../config.yaml')
  , mandrill = require('node-mandrill')(config.mandrill_api_key);

exports.stripDomain = function (email) {
	address = email.split('@');

	return address[0];
}

exports.send = function(to, from, subject, text) {
  mandrill('/messages/send', {
    message: {
      to: to,
      from_email: from,
      subject: subject,
      text: text
    }
  });
}

exports.parse = function(msg) {

  var group_file = __dirname + '/../groups/' + this.stripDomain(msg.email) + '.yaml';

  fs.exists(group_file, function (exists) {
    if (exists) {

      var group = require(group_file);

      // Check to make sure the sender is in the group
      var sender_in_group = _(group.members).find(function(el) { return el.email === msg.from_email; });

      // Only send email if send is in the grouop
      if (sender_in_group) {

        // Remove the sender
        var recipients = _(group.members).reject(function(el) { return el.email === msg.from_email; });

        mandrill('/messages/send', {
          message: {
            to: recipients,
            from_email: msg.email,
            from_name: msg.from_name,
            subject: '[' + group.title + '] ' + msg.subject, // A decent place for customization
            text: msg.text,
            html: msg.html
          }
        }, function(error, response) {
          if (error) console.log( 'Send Error: ' + JSON.stringify(error) );
          else console.log('Sent!');
        });
      }
    }
  });

}