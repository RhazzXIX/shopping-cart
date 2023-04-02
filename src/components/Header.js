const Header = (props) => {
  const { itemsAmount } = props;
  return (
    <header id="nav">
      <button>Home</button>
      <button>Shop</button>
      <button id="cart">Cart {itemsAmount !== 0 ? itemsAmount : null}</button>
    </header>
  );
};

export default Header;
