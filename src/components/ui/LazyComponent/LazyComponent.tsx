import React, {Suspense} from "react";

interface LazyComponentPropsInterface {
    import: () => Promise<{default: React.ComponentType<any>}>
}

export default (props: LazyComponentPropsInterface) => {
    const Component = React.lazy(() => props.import());

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component/>
        </Suspense>
    )
}

