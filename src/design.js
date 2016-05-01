const designUnit = {
  primaryColor: '#965B9F',
  tintColor: '#ffffff',
  titleTextColor: '#ffffff',
  backgroundColor: '#f2f2f2',
  labelFontSize: 18
};

const designComp = {
  button: {
    backgroundColor: designUnit.primaryColor,
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 5,
    marginTop: 8
  },
  buttonText: {
    color: 'white',
    padding: 12,
    fontSize: 18
  },
  label: {
    paddingLeft: 17,
    paddingTop: 24,
    fontSize: designUnit.labelFontSize
  }
};

export default {
  designUnit: designUnit,
  designComp: designComp
};
