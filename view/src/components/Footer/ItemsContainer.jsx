import Item from "./Item";
import { PRODUCTS, RESOURCES } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 text-[#ffffff]">
      <Item Links={PRODUCTS} title="Services" />
      <Item Links={RESOURCES} title="Registration" />
      {/*
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" /> */}
    </div>
  );
};

export default ItemsContainer;
