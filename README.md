# Best Bubble Tea

## TEST CHANGE, SORRY I DID THIS DIRECTLY ON GITHUB

## Description

Best Bubble Tea is a responsive ordering and shop-management web application for a bubble tea café.

The storefront includes milk teas, fruit teas, slushes, and popular snacks such as fries, takoyaki, Taiwanese popcorn chicken, egg waffles, and mochi.

Customers can browse drinks and snacks, build a cart, complete a simulated checkout, save profile information, and review order history. Staff can use a separate management area to maintain the menu and track customer orders through the fulfillment process.

The application is a frontend-only demo built with HTML, CSS, Tailwind CSS, and JavaScript. It is intended to demonstrate the interface and workflow of a bubble tea ordering system without requiring a backend server or database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [CreditsAuthors](#creditsauthors)
- [License](#license)
- [Features](#features)
- [Tests](#tests)
- [Important Limitations and Terms of Use](#important-limitations-and-terms-of-use)
- [Reporting Problems](#reporting-problems)

## Installation

No npm packages or build tools are required. The project as been made available online, but can also be installed locally.

The application loads menu data from `data/menu.json` with the Fetch API, so run it through a local web server rather than opening `index.html` directly. Run a preferred local web server from the project directory (such as _Webpack_'s `devServer`, or _Live Server_), then open:

```text
http://localhost:[port number]
```
### Deployed Application

The project site can be visited at:

```text
https://thaiscailet.github.io/bestbubbletea/
```

## Usage

Usage instructions shall be updated soon, for now, know what is available for you to do in the app by reading below.

### Customer Interface

Customers can:

1. Browse bubble tea, fruit tea, slush, snack, and sweets categories.
2. Search or filter the menu.
3. Save favorite items.
4. Add drinks and snacks to the cart.
5. Increase, decrease, or remove quantities.
6. Review subtotal, fees, tax, and total.
7. Choose pickup or delivery.
8. Complete the simulated checkout.
9. Save profile information in the browser.
10. Review previously submitted orders and their current status.

### Staff Interface

Open the staff/admin area and use the demonstration account:

```text
Email: admin@pearlandleaf.test
Password: demo1234
```

Staff can:

1. Add or edit drinks and snack items.
2. Mark products available or sold out.
3. Remove menu items.
4. Restore the original menu.
5. Review submitted orders.
6. Update an order through the fulfillment process.

The staff login is a demonstration feature only and is not secure authentication.

### Screenshots

Screenshots can be added to the repository and displayed in this README with Markdown:

```md
![Best Bubble Tea menu](assets/screenshots/menu.png)
```

## Credits/Authors

- **Author:** Thais Cailet
- **GitHub:** `https://github.com/thaiscailet`
- Built with HTML, CSS, Tailwind CSS, and JavaScript.

Add any third-party image, icon, font, tutorial, or other attribution required by assets introduced into the project.

## License

Add the code license selected for this repository.

For example, if the project uses the MIT License, include a `LICENSE` file in the repository and identify it here.

## Features

### Customer Features

- Responsive bubble tea and snack menu
- Search and category filtering
- Favorites
- Shopping cart and quantity controls
- Real-time order totals
- Pickup and delivery options
- Simulated checkout
- Client-side form validation
- Profile information
- Order history and status tracking

### Staff Features

- Demo staff login
- Drink and snack creation/editing
- Product availability management
- Menu item removal and restoration
- Order review
- Order-status updates

### Technical Features

- Responsive Tailwind CSS interface
- JavaScript DOM updates and event handling
- Asynchronous menu loading with `fetch()`
- JSON menu data
- Browser-side persistence with `localStorage`

## Tests

No automated test suite is included.

Recommended manual checks:

- Confirm menu data loads successfully.
- Test the interface at small and large viewport widths.
- Search and filter drinks and snacks.
- Add and remove cart items.
- Change item quantities and confirm totals update.
- Submit the checkout form with valid and invalid input.
- Submit a simulated order.
- Confirm the order appears in order history.
- Sign in to the staff area.
- Change an order status and confirm the update.
- Refresh the page and confirm expected browser-stored data remains.
- Check the browser console for unexpected errors.

## Important Limitations and Terms of Use

Best Bubble Tea is a frontend demonstration and is not intended for production shop operations.

- Payments are simulated.
- Staff authentication is client-side only.
- There is no backend application server or database.
- Cart, profile, menu, favorite, and order information is stored only in the current browser.
- Browser-stored data is not automatically shared between devices or users.
- Do not enter real passwords, payment-card information, or other sensitive personal data.
- The application does not provide production-grade authentication, authorization, payment processing, order fulfillment, or customer-data protection.

## Reporting Problems

Report bugs and feature requests through the repository issue tracker:

```text
https://github.com/thaiscailet/bestbubbletea/issues
```
