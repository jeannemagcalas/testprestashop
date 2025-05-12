# Prestashop

## Pre reqs

```bash
1. Download VSCode
2. Download or Clone this repository

```

## Setup

```bash
npm install
```

## Run all tests

```bash
npx playwright test
```

## Run tests by folder

```bash
npx playwright test tests/smoke
npx playwright test tests/regression
```

## Run mobile tests

```bash
npx playwright test --project="Mobile Safari"
```

## Running specific tests

```bash
npx playwright test tests/smoke/smoke.spec.ts
npx playwright test tests/smoke/smoke-mobile.spec.ts
npx playwright test tests/regression/regression.spec.ts
```
