import { Route, Link } from 'react-router-dom';

const NavLink = ({ to, exact, children, className, activeClassName, ...rest }) => {
  const path = typeof to === 'object' ? to.pathname : to;
  return (
    <Route
      path={path}
      exact={exact}
      children={({ match }) => {
        const isActive = !!match;
        return (
          <Link
            {...rest}
            className={
              isActive
                ? [typeof className === 'function' ? className(isActive) : className, activeClassName]
                    .filter((i) => i)
                    .join(' ')
                : typeof className === 'function'
                ? className(isActive)
                : className
            }
            to={to}
          >
            {typeof children === 'function' ? children(isActive) : children}
          </Link>
        );
      }}
    />
  );
};

export default NavLink;
