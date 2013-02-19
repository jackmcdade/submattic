var fs = require('fs')
  , _ = require('underscore')
  , _s = require('underscore.string')
  , yaml = require('js-yaml')
  , config = require(__dirname + '/../config.yaml')
  , mandrill = require('node-mandrill')(config.mandrill_api_key);

function stripDomain(email) {
	address = email.split('@');

	return address[0];
}


function send(to, from, subject, text) {
  mandrill('/messages/send', {
    message: {
      to: to,
      from_email: from,
      subject: subject,
      text: text
    }
  });
}


function cleanSubjectLine(subject, group_title) {
  var is_reply = _s.include(subject, "Re:");

  if (is_reply) {
    repeat_pattern = "Re: [" + group_title + "]";

    return subject.replace(repeat_pattern + " " + repeat_pattern, repeat_pattern);
  }

  return "[" + group_title + "] " + subject;
}


exports.parse = function(msg) {

  var group_file = __dirname + '/../groups/' + stripDomain(msg.email) + '.yaml';

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
            subject: cleanSubjectLine(msg.subject, group.title), // A decent place for customization
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