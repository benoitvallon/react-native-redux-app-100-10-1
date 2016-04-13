const designUnit = {
  primaryColor: '#6d4a72',
  tintColor: '#ffffff',
  titleTextColor: '#ffffff',
  backgroundColor: '#f2f2f2'
};

const designComp = {
  button: {
    backgroundColor: designUnit.primaryColor,
    // backgroundColor: 'red',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 5,
    marginTop: 8
  },
  buttonText: {
    color: 'white',
    padding: 12,
    fontSize: 20
  }
};

export default {
  designUnit: designUnit,
  designComp: designComp
};
