/* eslint-disable react/prop-types */
const Item = ({ Links, title }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className="text-[#465642] hover:text-[#ea774d] duration-300
          text-sm cursor-pointer leading-6 font-bold"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Item;
