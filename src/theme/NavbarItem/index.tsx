import React from 'react';
import OriginalNavbarItem from '@theme-original/NavbarItem';
import type { Props } from '@theme/NavbarItem';
import AuthButton from '@site/src/components/auth/AuthButton';

const NavbarItemWrapper = (props: Props) => {
  if (props.type === 'custom-auth-button') {
    return <AuthButton />;
  }

  return <OriginalNavbarItem {...props} />;
};

export default NavbarItemWrapper;



