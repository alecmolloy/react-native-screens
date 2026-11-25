#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>
#import <React_RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
#import <React_RCTAppDelegate/RCTReactNativeFactory.h>
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

static UITabBarController *findTabs(UIViewController *controller) {
  if ([controller isKindOfClass:UITabBarController.class]) {
    return (UITabBarController *)controller;
  }
  for (UIViewController *child in controller.childViewControllers) {
    UITabBarController *tabs = findTabs(child);
    if (tabs) return tabs;
  }
  return nil;
}

@interface ProbeApp : UIResponder <UIApplicationDelegate>
@end
@implementation ProbeApp
@end

@interface ProbeScene : RCTDefaultReactNativeFactoryDelegate <UIWindowSceneDelegate>
@property(nonatomic, strong) UIWindow *window;
@property(nonatomic, strong) RCTReactNativeFactory *factory;
@end

@implementation ProbeScene
- (NSURL *)bundleURL {
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
}
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
  return self.bundleURL;
}
- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session
      options:(UISceneConnectionOptions *)options {
  self.dependencyProvider = [RCTAppDependencyProvider new];
  self.window = [[UIWindow alloc] initWithWindowScene:(UIWindowScene *)scene];
  self.factory = [[RCTReactNativeFactory alloc] initWithDelegate:self];
  [self.factory startReactNativeWithModuleName:@"FrameProbe" inWindow:self.window connectionOptions:options];
}
@end

// The example has one scene and one tab controller.
static UITabBarController *currentTabs(void) {
  UIWindowScene *scene = (UIWindowScene *)UIApplication.sharedApplication.connectedScenes.anyObject;
  return findTabs(scene.keyWindow.rootViewController);
}

@interface SidebarProbe : NSObject <RCTBridgeModule>
@end

@implementation SidebarProbe
RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(toggleSidebar) {
  if (@available(iOS 18.0, *)) {
    UITabBarController *tabs = currentTabs();
    tabs.sidebar.preferredLayout = UITabBarControllerSidebarLayoutTile;
    tabs.sidebar.hidden = !tabs.sidebar.isHidden;
  }
}

RCT_EXPORT_METHOD(measurePage:(RCTResponseSenderBlock)reply) {
  UIView *page = currentTabs().selectedViewController.view;
  reply(@[page ? @(page.bounds.size.width) : NSNull.null]);
}
@end

int main(int argc, char **argv) {
  @autoreleasepool {
    return UIApplicationMain(argc, argv, nil, NSStringFromClass(ProbeApp.class));
  }
}
