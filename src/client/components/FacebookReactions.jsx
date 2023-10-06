var React = require("react-native");
var {
  StyleSheet,
  Text,
  Image,
  View,
  PanResponder,
  TouchableOpacity,
  Animated,
} = React;

var images = [
  { id: "like", img: "http://i.imgur.com/LwCYmcM.gif" },
  { id: "love", img: "http://i.imgur.com/k5jMsaH.gif" },
  { id: "haha", img: "http://i.imgur.com/f93vCxM.gif" },
  { id: "yay", img: "http://i.imgur.com/a44ke8c.gif" },
  { id: "wow", img: "http://i.imgur.com/9xTkN93.gif" },
  { id: "sad", img: "http://i.imgur.com/tFOrN5d.gif" },
  { id: "angry", img: "http://i.imgur.com/1MgcQg0.gif" },
];

var App = React.createClass({
  getInitialState: function () {
    return {
      selected: "",
      open: false,
    };
  },
  componentWillMount: function () {
    this._imgLayouts = {};
    this._imageAnimations = {};
    this._hoveredImg = "";

    this._scaleAnimation = new Animated.Value(0);

    images.forEach((img) => {
      this._imageAnimations[img.id] = {
        position: new Animated.Value(55),
        scale: new Animated.Value(1),
      };
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: this.open,
      onPanResponderMove: (evt, gestureState) => {
        var hoveredImg = this.getHoveredImg(
          Math.ceil(evt.nativeEvent.locationX)
        );

        if (hoveredImg && this._hoveredImg !== hoveredImg) {
          this.animateSelected(this._imageAnimations[hoveredImg]);
        }
        if (this._hoveredImg !== hoveredImg && this._hoveredImg) {
          this.animateFromSelect(this._imageAnimations[this._hoveredImg]);
        }

        this._hoveredImg = hoveredImg;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this._hoveredImg) {
          this.animateFromSelect(
            this._imageAnimations[this._hoveredImg],
            this.close.bind(this, this.afterClose)
          );
        } else {
          this.close(this.afterClose);
        }
      },
    });
  },
  afterClose: function () {
    if (this._hoveredImg) {
      this.setState({
        selected: this._hoveredImg,
      });
    }

    this._hoveredImg = "";
  },
  animateSelected: function (imgAnimations) {
    Animated.parallel([
      Animated.timing(imgAnimations.position, {
        duration: 150,
        toValue: -30,
      }),
      Animated.timing(imgAnimations.scale, {
        duration: 150,
        toValue: 1.8,
      }),
    ]).start();
  },
  animateFromSelect: function (imgAnimations, cb) {
    Animated.parallel([
      Animated.timing(imgAnimations.position, {
        duration: 50,
        toValue: 0,
      }),
      Animated.timing(imgAnimations.scale, {
        duration: 50,
        toValue: 1,
      }),
    ]).start(cb);
  },
  getHoveredImg: function (x) {
    return Object.keys(this._imgLayouts).find((key) => {
      return (
        x >= this._imgLayouts[key].left && x <= this._imgLayouts[key].right
      );
    });
  },

  getImageAnimationArray: function (toValue) {
    return images.map((img) => {
      return Animated.timing(this._imageAnimations[img.id].position, {
        duration: 200,
        toValue: toValue,
      });
    });
  },
  open: function () {
    Animated.parallel([
      Animated.timing(this._scaleAnimation, {
        duration: 100,
        toValue: 1,
      }),
      Animated.stagger(50, this.getImageAnimationArray(0)),
    ]).start(() => this.setState({ open: true }));
  },
  close: function (cb) {
    this.setState({ open: false }, () => {
      Animated.stagger(100, [
        Animated.parallel(this.getImageAnimationArray(55, 0).reverse()),
        Animated.timing(this._scaleAnimation, {
          duration: 100,
          toValue: 0,
        }),
      ]).start(cb);
    });
  },
  handleLayoutPosition: function (img, position) {
    this._imgLayouts[img] = {
      left: position.nativeEvent.layout.x,
      right: position.nativeEvent.layout.x + position.nativeEvent.layout.width,
    };
  },
  getImages: function () {
    return images.map((img) => {
      return (
        <Animated.Image
          onLayout={this.handleLayoutPosition.bind(this, img.id)}
          key={img.id}
          source={{ uri: img.img }}
          style={[
            styles.img,
            {
              transform: [
                { scale: this._imageAnimations[img.id].scale },
                { translateY: this._imageAnimations[img.id].position },
              ],
            },
          ]}
        />
      );
    });
  },
  getLikeContainerStyle: function () {
    return {
      transform: [{ scaleY: this._scaleAnimation }],
      overflow: this.state.open ? "visible" : "hidden",
    };
  },
  render: function () {
    return (
      <View style={styles.container}>
        <View style={styles.center} {...this._panResponder.panHandlers}>
          <Text>Like</Text>
          <Text>You selected: {this.state.selected}</Text>
          <Animated.View
            style={[styles.likeContainer, this.getLikeContainerStyle()]}
          >
            <View style={styles.borderContainer} />
            <View style={styles.imgContainer}>{this.getImages()}</View>
          </Animated.View>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    position: "absolute",
    left: 50,
    top: 300,
  },
  likeContainer: {
    position: "absolute",
    left: -10,
    top: -30,
    padding: 5,
    flex: 1,
    backgroundColor: "#FFF",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 20,
  },
  borderContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 20,
  },
  imgContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  img: {
    marginLeft: 5,
    marginRight: 5,
    width: 30,
    height: 30,
    overflow: "visible",
  },
});

module.exports = App;