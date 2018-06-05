import * as LogManager from 'aurelia-logging';
import {
  RouteRecognizer
} from 'aurelia-route-recognizer';
import {
  Container
} from 'aurelia-dependency-injection';
import {
  History
} from 'aurelia-history';
import {
  EventAggregator
} from 'aurelia-event-aggregator';
export declare interface NavigationInstructionInit {
  fragment: string;
  queryString: string;
  params: Object;
  queryParams: Object;
  config: RouteConfig;
  parentInstruction: NavigationInstruction;
  previousInstruction: NavigationInstruction;
  router: Router;
  options: Object;
}

/**
* When a navigation command is encountered, the current navigation
* will be cancelled and control will be passed to the navigation
* command so it can determine the correct action.
*/
/**
* When a navigation command is encountered, the current navigation
* will be cancelled and control will be passed to the navigation
* command so it can determine the correct action.
*/
export declare interface NavigationCommand {
  navigate(router: Router): void;
}

/**
* A callback to indicate when pipeline processing should advance to the next step
* or be aborted.
*/
export declare interface Next {
  
  /**
    * Indicates the successful completion of the entire pipeline.
    */
  complete(result?: any): Promise<any>;
  
  /**
    * Indicates that the pipeline should cancel processing.
    */
  cancel(result?: any): Promise<any>;
  
  /**
    * Indicates that pipeline processing has failed and should be stopped.
    */
  reject(result?: any): Promise<any>;
  
  /**
    * Indicates the successful completion of the pipeline step.
    */
  (): Promise<any>;
}

/**
 * A basic interface for an Observable type
 */
export declare interface IObservable {
  subscribe(): ISubscription;
}

/**
 * A basic interface for a Subscription to an Observable
 */
/**
 * A basic interface for a Subscription to an Observable
 */
export declare interface ISubscription {
  unsubscribe(): void;
}
export declare class CommitChangesStep {
  run(navigationInstruction: NavigationInstruction, next: Function): any;
}

/**
* Class used to represent an instruction during a navigation.
*/
export declare class NavigationInstruction {
  
  /**
    * The URL fragment.
    */
  fragment: string;
  
  /**
    * The query string.
    */
  queryString: string;
  
  /**
    * Parameters extracted from the route pattern.
    */
  params: any;
  
  /**
    * Parameters extracted from the query string.
    */
  queryParams: any;
  
  /**
    * The route config for the route matching this instruction.
    */
  config: RouteConfig;
  
  /**
    * The parent instruction, if this instruction was created by a child router.
    */
  parentInstruction: NavigationInstruction;
  
  /**
    * The instruction being replaced by this instruction in the current router.
    */
  previousInstruction: NavigationInstruction;
  
  /**
    * viewPort instructions to used activation.
    */
  viewPortInstructions: any;
  
  /**
      * The router instance.
    */
  router: Router;
  plan: Object;
  options: Object;
  constructor(init: NavigationInstructionInit);
  
  /**
    * Gets an array containing this instruction and all child instructions for the current navigation.
    */
  getAllInstructions(): Array<NavigationInstruction>;
  
  /**
    * Gets an array containing the instruction and all child instructions for the previous navigation.
    * Previous instructions are no longer available after navigation completes.
    */
  getAllPreviousInstructions(): Array<NavigationInstruction>;
  
  /**
    * Adds a viewPort instruction.
    */
  addViewPortInstruction(viewPortName: string, strategy: string, moduleId: string, component: any): any;
  
  /**
    * Gets the name of the route pattern's wildcard parameter, if applicable.
    */
  getWildCardName(): string;
  
  /**
    * Gets the path and query string created by filling the route
    * pattern's wildcard parameter with the matching param.
    */
  getWildcardPath(): string;
  
  /**
    * Gets the instruction's base URL, accounting for wildcard route parameters.
    */
  getBaseUrl(): string;
}

/**
* Class for storing and interacting with a route's navigation settings.
*/
export declare class NavModel {
  
  /**
    * True if this nav item is currently active.
    */
  isActive: boolean;
  
  /**
    * The title.
    */
  title: string;
  
  /**
    * This nav item's absolute href.
    */
  href: string;
  
  /**
    * This nav item's relative href.
    */
  relativeHref: string;
  
  /**
    * Data attached to the route at configuration time.
    */
  settings: any;
  
  /**
    * The route config.
    */
  config: RouteConfig;
  
  /**
    * The router associated with this navigation model.
    */
  router: Router;
  constructor(router: Router, relativeHref: string);
  
  /**
    * Sets the route's title and updates document.title.
    *  If the a navigation is in progress, the change will be applied
    *  to document.title when the navigation completes.
    *
    * @param title The new title.
    */
  setTitle(title: string): void;
}

/**
* A configuration object that describes a route.
*/
export declare export declare interface RouteConfig {
  
  /**
    * The route pattern to match against incoming URL fragments, or an array of patterns.
    */
  route: string | string[];
  
  /**
    * A unique name for the route that may be used to identify the route when generating URL fragments.
    * Required when this route should support URL generation, such as with [[Router.generate]] or
    * the route-href custom attribute.
    */
  name?: string;
  
  /**
    * The moduleId of the view model that should be activated for this route.
    */
  moduleId?: string;
  
  /**
    * A URL fragment to redirect to when this route is matched.
    */
  redirect?: string;
  
  /**
    * A function that can be used to dynamically select the module or modules to activate.
    * The function is passed the current [[NavigationInstruction]], and should configure
    * instruction.config with the desired moduleId, viewPorts, or redirect.
    */
  navigationStrategy?: (instruction: NavigationInstruction) => Promise<void> | void;
  
  /**
    * The view ports to target when activating this route. If unspecified, the target moduleId is loaded
    * into the default viewPort (the viewPort with name 'default'). The viewPorts object should have keys
    * whose property names correspond to names used by <router-view> elements. The values should be objects
    * specifying the moduleId to load into that viewPort.  The values may optionally include properties related to layout:
    * `layoutView`, `layoutViewModel` and `layoutModel`.
    */
  viewPorts?: any;
  
  /**
    * When specified, this route will be included in the [[Router.navigation]] nav model. Useful for
    * dynamically generating menus or other navigation elements. When a number is specified, that value
    * will be used as a sort order.
    */
  nav?: boolean | number;
  
  /**
    * The URL fragment to use in nav models. If unspecified, the [[RouteConfig.route]] will be used.
    * However, if the [[RouteConfig.route]] contains dynamic segments, this property must be specified.
    */
  href?: string;
  
  /**
    * Indicates that when route generation is done for this route, it should just take the literal value of the href property.
    */
  generationUsesHref?: boolean;
  
  /**
    * The document title to set when this route is active.
    */
  title?: string;
  
  /**
    * Arbitrary data to attach to the route. This can be used to attached custom data needed by components
    * like pipeline steps and activated modules.
    */
  settings?: any;
  
  /**
    * The navigation model for storing and interacting with the route's navigation settings.
    */
  navModel?: NavModel;
  
  /**
    * When true is specified, this route will be case sensitive.
    */
  caseSensitive?: boolean;
  
  /**
    * Add to specify an activation strategy if it is always the same and you do not want that
    * to be in your view-model code. Available values are 'replace' and 'invoke-lifecycle'.
    */
  activationStrategy?: 'no-change' | 'invoke-lifecycle' | 'replace';
  
  /**
     * specifies the file name of a layout view to use.
     */
  layoutView?: string;
  
  /**
     * specifies the moduleId of the view model to use with the layout view.
     */
  layoutViewModel?: string;
  
  /**
     * specifies the model parameter to pass to the layout view model's `activate` function.
     */
  layoutModel?: any;
  [x: string]: any;
};