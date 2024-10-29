import React from "react";
import { render, screen } from "@testing-library/react";

import PelulusStage2CreateDialogComponent from "../PelulusStage2CreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders pelulusStage2 create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PelulusStage2CreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("pelulusStage2-create-dialog-component")).toBeInTheDocument();
});
