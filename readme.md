Submattic
=========

*Crazy simple, Node.js powered, whitelist-only email groups. For humans!*

## Requirements

1. [Node.js](http://nodejs.com) & [NPM](http://npmjs.com) installed on your dev server
2. A [Mandrill](http://mandrill.com) account
3. A domain or subdomain with your [MX records pointed at Mandrill](http://help.mandrill.com/entries/21699367-Overview)

## Installing

1. Clone the repo to your dev server.
2. Run `npm install`
3. Add and edit your groups in /groups/<name of your group>.yaml
4. Deploy to [Heroku](http://heroku.com), [Nodejitsu](http://nodejitsu.com), or your Node hosting service of choice.
5. Point Mandrill's Inbound Email (*) wildcard domain route to the public root URL (e.g. http://example-url.com). You can choose to specially add each mailbox route explicity to avoid having exceess email (read: SPAM) hit your server unnecessarily. ![Mandrill Settings](http://f.cl.ly/items/3Z1G2U3e1J1a1I370l1B/mandrill-screenshot.png)
6. Edit the config.yaml file and add your Mandrill API Key.

## Usage
Create a group by adding a YAML file to the /groups folder. A file named `gamenight.yaml` would create the email list `gamenight@example.com`. The file should contain a title (used in the subject lines) and a list of name/email keys for all the memebers. Here's an example of a group file:

```yaml
title: Example
members:
  -
    name: Peter Pevensie
    email: peter@example.com
  -
    name: Susan Pevensie
    email: susan@example.com
  -
    name: Edmund Pevensie
    email: edmund@example.com
  -
    name: Lucy Pevensie
    email: lucy@example.com
```

Only emails from people **within the group** (this is white-listing) will be accepted and routed to the rest of the members. Full HTML/text content will be passed along.

## Quick Start guides to hosting Submattic

We'll assume you have Submattic running locally already.

### Running on [Heroku](http://heroku)

1. [Create a Heroku account](https://api.heroku.com/signup/devcenter)
2. Install the Heroku gem: `gem install heroku` or install the [Heroku Toolbelt](https://toolbelt.heroku.com/)
3. Login `heroku login` and authenticate with your account info
4. Create the app: `heroku create`
5. Deploy: `git push heroku master`
6. Turn a dyno on to make sure the app is running: `heroku ps:scale web=1`
7. Visit the app to make sure Submattic is running: `heroku open`.

### Running on [Nodejitsu](http://nodejitsu.com)

1. [Create a Nodejitsu account](https://www.nodejitsu.com/signup)
2. Install `jitsu`, the command line interface for Nodejitsu's platform: `npm install jitsu -g`
3. Login `jitsu login` and authenticate with your account info
4. Deploy: `jitsu deploy`. Nodejitsu will ask you for some additional info, like your app's name, subdomain, and start script. The start script is `app.js`.
5. Visit `<yourapp>.nodejitsu.com` to make sure everything's running.