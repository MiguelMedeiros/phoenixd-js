# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Added

- `listOutgoingPayments()` for phoenixd's `GET /payments/outgoing`, returning Lightning and on-chain outgoing payments.
- `ListPaymentsParams` (`from`, `to`, `limit`, `offset`, `all`) accepted by both payment-list methods, matching phoenixd's query parameters.

### Fixed

- `listIncomingPayments()` now sends `externalId` as an encoded query parameter instead of interpolating it into the URL, so values containing `&`, `#` or `=` can no longer inject or truncate query parameters. `externalId` is optional, matching phoenixd.

### Changed

- `PaymentInfoOutgoing` now matches phoenixd's `outgoing_payment` JSON: adds `subType`, `paymentId` and `txId`, and marks `paymentHash`, `preimage`, `invoice` and `completedAt` optional because phoenixd omits null fields.
- `getOutgoingPayment()` is documented to return on-chain outgoing payments (channel close, splice, liquidity purchases) as served by phoenixd v0.9.2+.

### Security

- Bump `axios` to 1.21.0 and its transitive `follow-redirects` to 1.16.2, fixing high-severity advisories where credential headers (the phoenixd Basic auth token) could survive cross-origin redirects (GHSA-q3jh-wrc6-jgq8, GHSA-8r9p-f939-6h3c, GHSA-mrwp-f3q8-3g9p).
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