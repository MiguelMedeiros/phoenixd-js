# Changelog

All notable changes to this project are documented in this file.

## [1.2.0] - 2026-09-03

### Added

- Support for phoenixd v0.9 swap-in balances and deposit-address retrieval.
- Closing transaction IDs in successful `closeChannel()` responses.

### Fixed

- Treat phoenixd's closing transaction ID as a successful channel close instead of an unexpected response.
- Preserve phoenixd's textual close-channel failure reason for callers.

[1.2.0]: https://github.com/MiguelMedeiros/phoenixd-js/compare/v1.1.1...v1.2.0