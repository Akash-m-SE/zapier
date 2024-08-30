import { useState } from "react";
import { Input } from "../Input";
import PrimaryButton from "../buttons/PrimaryButton";

const SolanaSelector = ({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      <Input
        label={"Wallet Address"}
        type={"text"}
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      ></Input>
      <Input
        label={"Amount"}
        type={"text"}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      ></Input>
      <div className="pt-4">
        <PrimaryButton
          onClick={() => {
            setMetadata({
              amount,
              address,
            });
          }}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SolanaSelector;
