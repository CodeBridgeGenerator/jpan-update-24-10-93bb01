import React from "react";
import { render, screen } from "@testing-library/react";

import PelulusStage2EditDialogComponent from "../PelulusStage2EditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders pelulusStage2 edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PelulusStage2EditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("pelulusStage2-edit-dialog-component")).toBeInTheDocument();
});
