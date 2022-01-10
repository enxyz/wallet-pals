# wallet-pals

look for shared tokens among wallets aka facebook you both liked token x!

Based on https://github.com/nickytonline/web3-starter

## References

https://docs.alchemy.com/alchemy/tutorials/simple-web3-script
https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/

## Run

Start project, open http://localhost:3000/main in browser and check console.

## Getting Started

1. Install dependencies

   ```bash
   yarn install
   ```

1. Add secrets

   `./_secrets/wallets.js`

1. Run locally

   ```bash
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Running tests

The project uses [jest](https://jestjs.io). For more information on jest, see
the [official documentation](https://jestjs.io/docs/getting-started).

To run tests:

```bash
npm test
# or
yarn test
```

To run tests in watch mode:

```bash
npm test:watch
# or
yarn test:watch
```

## Building out components

When building out components in the project, shared components can go in the
`components` folder. Components can then be imported using the `@components`
alias, e.g. `import { ExampleHeader } from '@components/Header';`.

### Storybook

The project uses [Storybook](https://storybook.js.org) for building our
components. For more on Storybook, see the
[official documentation](https://storybook.js.org/docs/react).

### Running Storybook

```bash
npm run storybook
# or
yarn storybook
```

### Building Storybook Static Site

```bash
npm run build-storybook
# or
yarn build-storybook
```
