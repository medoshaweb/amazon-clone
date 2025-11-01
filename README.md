Amazon Clone — Netlify (frontend) + Firebase (backend) + Stripe (payments)

A complete README to get your Amazon-style e-commerce clone running with a Netlify-hosted React frontend, Firebase (Auth, Firestore, Cloud Functions / Storage) as the backend, and Stripe for payments. This README includes local dev, environment variables, Stripe webhook setup, deployment steps, testing tips, and troubleshooting.

Quick overview

Frontend: React (Vite )

Hosting (frontend): Netlify

Backend: Firebase

Authentication (email / Google)

Firestore (products, orders, users)

Cloud Functions (server-side Stripe checkout, webhooks)

Firebase Storage 

Payments: Stripe (Checkout or Payment Intents + webhook verification)

Table of contents

Features

Prerequisites



1. Features

Browse products (Firestore)

Add to cart and checkout

User auth (Firebase Auth)

Orders stored in Firestore

Stripe-powered checkout with server-side payment processing (Cloud Functions)

Deployable frontend on Netlify

Optional product image uploads to Firebase Storage

2. Prerequisites

Node.js (16+ recommended)

npm 

Firebase CLI (npm install -g firebase-tools)

Stripe account (test mode)

Netlify account

Git
