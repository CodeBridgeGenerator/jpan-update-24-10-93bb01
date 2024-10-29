import React from "react";
import { render, screen } from "@testing-library/react";

import CalonStage2EditDialogComponent from "../CalonStage2EditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders calonStage2 edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CalonStage2EditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("calonStage2-edit-dialog-component")).toBeInTheDocument();
});
