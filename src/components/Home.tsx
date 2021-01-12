import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useRobotHome } from "./useRobotHome";
import styles from "./Home.module.css";

export const Home = () => {
  const {
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
  } = useRobotHome(); // Keep the business logic in hooks

  const getGridHTML = () => (
    <div className={`${styles.grid} ${styles.column}`}>
      Grid Co-ordinates:
      <TextField
        id="x-initial"
        label="X-Coordinates"
        className={styles.gridText}
        value={gridCo.x}
        onChange={handleGridCoChange("x")}
        disabled={gridLocal !== null}
      />
      <TextField
        id="y-initial"
        label="Y-Coordinates"
        className={styles.gridText}
        value={gridCo.y}
        onChange={handleGridCoChange("y")}
        disabled={gridLocal !== null}
      />
      <div className={styles.butPanel}>
        <Button
          variant="contained"
          className={styles.leftBtn}
          color="primary"
          onClick={handleSetGrid}
          disabled={gridLocal !== null}
        >
          Set
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setGridLocal(null);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <Paper>
      <div className={styles.container}>
        {getGridHTML()}
        {gridLocal !== null && (
          <div className={styles.robotPanel}>
            <div className={styles.leftColumn}>
              <div className={styles.column}>
                <span className={styles.robotHeading}>
                  Robot Co-ordinates and Orientation
                </span>
                <TextField
                  id="x-robot"
                  label="X-Robot"
                  value={robotCo.x}
                  className={styles.robotText}
                  onChange={handleRobotCoChange("x")}
                />
                <TextField
                  id="y-robot"
                  label="Y-Robot"
                  value={robotCo.y}
                  className={styles.robotText}
                  onChange={handleRobotCoChange("y")}
                />
                <Select
                  labelId="orientation-select-label"
                  id="orientation-select"
                  value={robotOrientation}
                  className={styles.robotOrientation}
                  onChange={(event: any) =>
                    setRobotOrientation(event.target.value)
                  }
                >
                  <MenuItem value="E">E</MenuItem>
                  <MenuItem value="W">W</MenuItem>
                  <MenuItem value="N">N</MenuItem>
                  <MenuItem value="S">S</MenuItem>
                </Select>

                <TextField
                  id="instruction-robot"
                  label="Robot Instructions"
                  value={robotInstructions}
                  className={`${styles.insText} ${styles.robotText}`}
                  onChange={(e) => setRobotInstructions(e.target.value)}
                />
                <div className={styles.insBtnPanel}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRobotInsChange("R")}
                    className={styles.insButton}
                  >
                    R
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRobotInsChange("L")}
                    className={styles.insButton}
                  >
                    L
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRobotInsChange("F")}
                    className={styles.insButton}
                  >
                    F
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setRobotInstructions("")}
                    className={styles.insButton}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                className={styles.AddRobot}
                onClick={handleAddRobot}
              >
                Add Robot
              </Button>
            </div>
            <div className={styles.column}>
              <TextField
                id="outlined-multiline-static"
                label="All Robots"
                multiline
                variant="outlined"
                value={getInputData()}
              />
              <Button
                variant="contained"
                color="primary"
                className={styles.AddRobot}
                onClick={() => setOutput(getOutputData())}
              >
                Run
              </Button>

              <TextField
                id="outlined-multiline-static"
                label="Output"
                multiline
                variant="outlined"
                value={output}
              />
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
};
