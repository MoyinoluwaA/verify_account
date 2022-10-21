# Verify Account API (Backend)

## Introduction

Verify Account API is a HTTP REST API for verifying bank account numbers.

## Overview

**What you can do with this API:**
- Authenticate users (Reister, Login and Verify email)
- Verify Account Number

## Set Up Development

- Check that the latest version on nodejs is installed:

```
  node --version
  >> v14.4.0 or greater
```

- Clone the repo and cd into it:

```bash
  git clone https://github.com/MoyinoluwaA/verify_account
  cd verify_account
```

- Install dependencies:

```bash
  npm install
```

- Create a `.env` file in the root folder and add all the configuration in the `.env.sample` file to it. Make sure you replace the values with the right values:

```
  # General settings
    DATABASE_URL=<DATABASE_URL> postgres
    MAIL_USERNAME=<email>
    MAIL_PASSWORD=<email password>
    OAUTH_CLIENTID=<nodemailer client id>
    OAUTH_CLIENT_SECRET=<nodemailer secret id>
    OAUTH_REFRESH_TOKEN=<nodemailer refresh toke>
    TOKEN_KEY=<random string to hash access token>
    RESET_TOKEN_KEY=<random string to hash reset token>
    SECRET_KEY=<paystack secret key>
    FRONTEND_BASE_URL=<frontend base url to redirect emails to>

```

or run this command and fill in the right details

```
    cp .env.sample .env
```

- Run the application with the command:

```
  npm start
```
