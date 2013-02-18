Submattic
=========

* Crazy simple, Node.js powered, whitelist-only email groups. For humans!*

## Requirements

1. [Node.js](http://nodejs.com) & [NPM](http://npmjs.com) installed on your dev server
2. A [Mandrill](http://mandrill.com) account
3. A domain or subdomain with your [MX records pointed at Mandrill](http://help.mandrill.com/entries/21699367-Overview)

## Installing

1. Clone the repo to your dev server.
2. Run `npm install`
3. Add and edit your groups in /groups/<name of your group>.yaml
4. Deploy to [Heroku](http://heroku.com), [Nodejitsu](http://nodejitsu.com), or your Node hosting service of choice.
5. Point Mandrill's Inbound Email (*) wildcard domain route to the public root URL (e.g. http://example-url.com).
6. Edit the config.yaml file and add your Mandrill API Key.

## Usage
Create a group by adding a YAML file to the /groups folder. A file named "gamenight.yaml" would create the email list "gamenight@example.com". The file should contain a title (used in the subject lines) and a list of name/email keys for all the memebers. An example file is in place for you to follow.

Only emails from people within the group will be accepted and routed to the rest of the members. Full HTML/text content will be passed along but attachements are not yet supported. This means animated gifs of kittens and painful injuries just need to be dropped in from a website instead of attached from your local computer. I know this is why you want to use the app in the first place.

## Todo
- Attachments
- Hash commands (e.g. #unsubscribe bob@example.com)
  - Subscribe
  - Unsubscribe
  - Request a full list
  - Logs
  - Schedule Email
  - Use template
  - List Help (show controls and some instructions)
- Send a message back if the group is invalid (maybe)
- Notifications of unsubscribes, bounces, etc