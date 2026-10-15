# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Changed

- `PaymentInfoOutgoing` now matches phoenixd's `outgoing_payment` JSON: adds `subType`, `paymentId` and `txId`, and marks `paymentHash`, `preimage`, `invoice` and `completedAt` optional because phoenixd omits null fields.
- `getOutgoingPayment()` is documented to return on-chain outgoing payments (channel close, splice, liquidity purchases) as served by phoenixd v0.9.2+.

### Security

- Bump runtime dependencies `axios` to 1.20.0 and `ws` to 8.22.0; `npm audit --omit=dev` reports no vulnerabilities.
- Move the test toolchain to Jest 30, removing the critical/high advisories reachable through Jest 29.

## [1.2.0] - 2026-09-03

### Added

- Support for phoenixd v0.9 swap-in balances and deposit-address retrieval.
- Closing transaction IDs in successful `closeChannel()` responses.

### Fixed

- Treat phoenixd's closing transaction ID as a successful channel close instead of an unexpected response.
- Preserve phoenixd's textual close-channel failure reason for callers.

[1.2.0]: https://github.com/MiguelMedeiros/phoenixd-js/compare/v1.1.1...v1.2.0