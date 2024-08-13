/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Dispenser } from "@/app/components/Dispenser/Dispenser";
import { DispenserStatus } from "@/types/dispenser";
import "@testing-library/jest-dom";

describe("Dispenser", () => {
  it("renders the dispenser with correct status button", () => {
    const dispenser = {
      "id": "b3ea6cde-c60d-4c68-b42f-1964205d557f",
      "status": DispenserStatus.OPEN,
      "updated_at": "2022-01-01T02:00:00Z"
    };
    const onClick = jest.fn();
    render(<Dispenser dispenser={dispenser} onClickDispenserStatus={onClick}/>);
    const dispenserButton = screen.getByRole('button', { name: "Close" });
    expect(dispenserButton).toBeInTheDocument();
  });
});
