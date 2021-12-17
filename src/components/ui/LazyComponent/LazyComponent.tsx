import React, { Suspense } from 'react';

interface LazyComponentPropsInterface {
    import: () => Promise<{ default: React.ComponentType<unknown> }>;
}

const LazyComponent = (props: LazyComponentPropsInterface) => {
    const Component = React.lazy(() => props.import());

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component />
        </Suspense>
    );
};

export default LazyComponent;
