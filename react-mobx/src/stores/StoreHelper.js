import React from 'react';
import { MobXProviderContext } from 'mobx-react';

// MobX와 Hooks 을 동시에 사용하기 위해서는 다음과 같은 Wrapper가 필요합니다.
function StoreHelper() {
    return React.useContext(MobXProviderContext);
}

export default StoreHelper;