import {Navigate, Route, Routes} from "react-router-dom";
import {privateRouter, publicRouter} from "../utils/router";
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../Context/AuthContext";
import {ERROR_ROUTE, MAIN_PAGE_ROUTE} from "../utils/consts";

const AppRouter = observer(() => {
    const {user} = useContext(AuthContext)

    return (
        user.isAuth
            ?
            <Routes>
                {
                    privateRouter.map(routePage=>
                        <Route
                            key={routePage.path}
                            path={routePage.path}
                            Component={routePage.component}
                            exact={routePage.exact}
                        >
                        </Route>
                    )

                }
                <Route path="*" element={<Navigate to={MAIN_PAGE_ROUTE} replace />} />
            </Routes>
            :
            <Routes>
                {
                publicRouter.map(routePage=>
                    <Route
                        key={routePage.path}
                        path={routePage.path}
                        Component={routePage.component}
                        exact={routePage.exact}
                    >
                    </Route>)
                }
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
    );
});

export default AppRouter;