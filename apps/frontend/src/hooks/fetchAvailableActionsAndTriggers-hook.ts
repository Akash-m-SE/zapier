import { AvailableAction, AvailableTrigger } from "@/types/types";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect } from "react";

interface FetchAvailableActionsAndTriggersProps {
  setAvailableActions: React.Dispatch<React.SetStateAction<AvailableAction[]>>;
  setAvailableTriggers: React.Dispatch<
    React.SetStateAction<AvailableTrigger[]>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const FetchAvailableActionsAndTriggers = (
  props: FetchAvailableActionsAndTriggersProps,
): void => {
  const fetchAvailableActionsAndTriggers = async () => {
    const { setAvailableActions, setAvailableTriggers, setLoading } = props;

    try {
      setLoading(true);
      const actions = await axiosInstance.get(`/api/v1/action/available`);
      const triggers = await axiosInstance.get(`/api/v1/trigger/available`);

      setAvailableActions(actions.data.availableActions);
      setAvailableTriggers(triggers.data.availableTriggers);
    } catch (error: any) {
      console.log("Error while fetching available actions = ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableActionsAndTriggers();
  }, []);
};

export default FetchAvailableActionsAndTriggers;
