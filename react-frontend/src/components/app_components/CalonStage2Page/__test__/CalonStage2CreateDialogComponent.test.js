import React from "react";
import { render, screen } from "@testing-library/react";

import CalonStage2CreateDialogComponent from "../CalonStage2CreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders calonStage2 create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CalonStage2CreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("calonStage2-create-dialog-component")).toBeInTheDocument();
});
