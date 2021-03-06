import RootContainerStyles from '../Styles/RootContainerStyles'

const styles ={
...RootContainerStyles,
  grid: {
    padding: "20px",
    display: "grid",
    gridTemplateRows: "85px 1fr 1fr 1fr",
    height: "inherit"
  },
  buttons: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    marginTop:"20px"
  }
}

export default styles