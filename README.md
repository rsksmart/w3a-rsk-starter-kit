[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/rsksmart/rsk-runes/badge)](https://scorecard.dev/viewer/?uri=github.com/rsksmart/rsk-runes)
[![CodeQL](https://github.com/rsksmart/rskj/workflows/CodeQL/badge.svg)](https://github.com/rsksmart/rsk-runes/actions?query=workflow%3ACodeQL)

<img src="rootstock-logo.png" alt="RSK Logo" style="width:100%; height: auto;" />

# Embedded Wallet in Rootstock using Web3Auth

**⚠️ Warning: This is a starter kit designed for hackathons and rapid prototyping. It is intended for educational and experimental purposes only. Use it at your own risk, and ensure thorough testing before deploying in production environments.**

This project leverages wagmi hooks for seamless wallet connection, balance retrieval, token transfers, and message signing, making it easy to integrate Web3 functionality into your Next.js applications. The wagmi library provides essential hooks for interacting with wallets like MetaMask and WalletConnect, allowing developers to focus on building their dApps rather than managing low-level blockchain interactions.

For more details on Embedded Wallets, explore the official [Web3Auth Documentation](https://web3auth.io/docs), which offers further insights into wallet management and features.

To get started, you’ll need to configure Web3Auth for your integration. Follow the guide on [Getting Started with Web3Auth](https://web3auth.io) to set up your Web3Auth environment and begin building with wagmi and Web3Auth.

## Prerequisites

Ensure that you have the following tools installed:

- Node.js (v19.x or later)
- Bun (v1.1.x or later) or Yarn (recommended for Next.js project)

## Features

1. **Wallet Connection**: Easily connect wallets using Web3Auth’s social login or direct wallet connections.
2. **Balances**: Retrieve balances for rBTC, tRIF, and DOC tokens on the Rootstock Testnet.
3. **Transfers**: Transfer rBTC, tRIF, and DOC tokens between addresses.
4. **Sign Messages**: Sign and verify messages using the connected wallet.

## How to Use

1. Clone the Repository

```
git clone https://github.com/rsksmart/w3a-rsk-starter-kit
cd w3a-rsk-starter-kit
```

2. Install Dependencies

```
yarn install # or bun install
```

3. Get your `clientId` from [Web3Auth Dashboard](https://dashboard.web3auth.io) and add it to the `page.tsx` file.

4. Run the Application

```
yarn dev # or bun run dev
```

## Contributors

- **rookiecol** ([@rookiecol](https://github.com/rookiecol))
- **flash** ([@flash](https://github.com/chrisarevalo11))

## Troubleshooting

- **Invalid Contract Address**: Ensure the contract addresses are correctly set in the `.env.local` file.
- **RPC Connection Issues**: Verify that the RPC URLs are reachable and correct.
- **Wallet Connection Issues**: Check if MetaMask is installed and the wallet is connected to the Rootstock Testnet.

## Contributing

We welcome contributions from the community. Please fork the repository and submit pull requests with your changes. Ensure your code adheres to the project's main objective.

## Support

For any questions or support, please open an issue on the repository or reach out to the maintainers.

# Disclaimer

The software provided in this GitHub repository is offered “as is,” without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.

- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software’s output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.
