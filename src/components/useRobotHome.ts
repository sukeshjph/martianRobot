import { useState } from "react";
import Grid from "../model/MarsGrid";
import Robot from "../model/RobotMain";

export const useRobotHome = () => {
  /* Grid state and handlers*/
  const [gridCo, setGridCo] = useState({ x: 0, y: 0 });
  const [gridLocal, setGridLocal] = useState<Grid | null>(null);

  const handleGridCoChange = (type: "x" | "y") => (e: any) => {
    setGridCo((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const handleSetGrid = () => {
    if (Object.values(gridCo).some((val) => val === 0)) return false;
    setGridLocal(new Grid(gridCo.x, gridCo.y));
  };
  /* Grid state and handlers*/

  /* Robot state and handlers */
  const [robotCo, setRobotCo] = useState({ x: 0, y: 0 });
  const [robotOrientation, setRobotOrientation] = useState("");
  const [robotInstructions, setRobotInstructions] = useState("");

  const [robotArray, setRobotArray] = useState<Robot[]>([]);

  const [output, setOutput] = useState("");

  const handleRobotInsChange = (type: "R" | "L" | "F") => () => {
    setRobotInstructions((prevState) => prevState.concat(type));
  };

  const handleRobotCoChange = (type: "x" | "y") => (e: any) => {
    setRobotCo((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const handleAddRobot = () => {
    const newRobot = new Robot(gridLocal);
    newRobot.setPosition(`${robotCo.x} ${robotCo.y} ${robotOrientation}`);
    newRobot.setInstructions(robotInstructions);
    setRobotArray((prevState) => [...prevState, newRobot]);
    setRobotCo({ x: 0, y: 0 });
    setRobotOrientation("");
    setRobotInstructions("");
  };

  const getInputData = () => {
    return `${gridCo.x} ${gridCo.y}\n\n${robotArray
      .map((rb) => {
        return `${rb.getPosition()}\n${rb.getInstructions()}`;
      })
      .join("\n\n")}`;
  };

  const getOutputData = () => {
    return robotArray.map((rb) => rb.move()).join("\n");
  };

  return {
    handleRobotInsChange,
    handleRobotCoChange,
    handleAddRobot,
    getInputData,
    getOutputData,
    output,
    setOutput,
    handleSetGrid,
    handleGridCoChange,
    gridCo,
    gridLocal,
    setGridLocal,
    robotCo,
    robotOrientation,
    setRobotOrientation,
    robotInstructions,
    setRobotInstructions,
  };
};
