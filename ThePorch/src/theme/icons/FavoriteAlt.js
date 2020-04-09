import React from 'react';
import Svg, { G, Path, Polyline } from 'react-native-svg';
import PropTypes from 'prop-types';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(
  ({ size = 32, fill, focused, secondaryFill, ...otherProps } = {}) => (
    <Svg width={size} height={size} viewBox="0 0 32 32" {...otherProps}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.8103 0C15.5557 0 16.2162 0.527183 16.4466 1.30582L19.1504 10.4466H27.9002C28.6455 10.4466 29.3061 10.9738 29.5365 11.7525C29.7667 12.5311 29.5145 13.384 28.9114 13.8654L21.8327 19.5146L24.5366 28.6555C24.7669 29.4341 24.5145 30.2871 23.9115 30.7685C23.3085 31.2496 22.492 31.2496 21.889 30.7685L14.8103 25.119L7.73166 30.7685C7.12866 31.2496 6.31216 31.2496 5.70917 30.7685C5.10618 30.2871 4.85386 29.4341 5.08419 28.6555L7.78802 19.5146L0.709307 13.8654C0.106313 13.384 -0.146005 12.5311 0.0843263 11.7525C0.31464 10.9738 0.975216 10.4466 1.72054 10.4466H10.4703L13.1742 1.30582C13.4045 0.527183 14.065 0 14.8103 0ZM11.7202 12.3364H1.72054L9.8105 18.7929L6.7204 29.2394L14.8103 22.783L22.9003 29.2394L19.8102 18.7929L27.9002 12.3364H17.9005L14.8103 1.88982L11.7202 12.3364Z"
        fill={focused ? secondaryFill : fill}
      />
      <Path
        opacity="0.2"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.6347 2.42985C16.9221 1.45763 18.1745 1.45763 18.4619 2.42985L21.215 11.7368C21.3435 12.1717 21.7124 12.4659 22.1286 12.4659H31.0375C31.968 12.4659 32.3549 13.7742 31.6021 14.3751L24.3946 20.127C24.058 20.3957 23.9172 20.872 24.0457 21.3068L26.7986 30.6137C27.0862 31.586 26.0733 32.3944 25.3203 31.7935L18.113 26.0415C17.7762 25.7729 17.3204 25.7729 16.9836 26.0415L9.77624 31.7935C9.02336 32.3944 8.01033 31.586 8.29792 30.6137L11.0509 21.3068C11.1795 20.872 11.0386 20.3957 10.7019 20.127L3.49453 14.3751C2.74163 13.7742 3.12857 12.4659 4.05919 12.4659H12.968C13.3842 12.4659 13.7531 12.1717 13.8816 11.7368L16.6347 2.42985Z"
        fill={focused ? secondaryFill : 'none'}
      />
    </Svg>
  )
);

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;