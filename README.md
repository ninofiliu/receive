# Receive

A quick utility to receive files from computer and phones on your local network

Requirements:

- deno
- `pnpm add -g qrcode`

Installation:

```sh
git clone git@github.com:ninofiliu/receive
cd receive
mkdir uploads
ln -s $PWD/receive.sh /usr/local/bin/receive
```

Usage

```sh
receive
# a qrcode appears, that you can scan with your phone
# it redirects to a web page with one file input
```

An ASCII QRCode appears in the terminal. Scan it with your phone to get redirected to a web page where you can upload files. Files will be uploaded in the [./uploads](./uploads/) directory.
