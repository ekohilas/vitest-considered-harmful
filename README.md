# Vitest Considered Harmful
_(AKA Overloading Node Considered Harmful)_

A [repo](https://github.com/ekohilas/vitest-considered-harmful) for resources of the talk.

> [!IMPORTANT]
> I'm currently working at Constantinople and we're [hiring!](https://jobs.lever.co/cxnpl)
> 
> We're an all-in-one software and operational platform for banks!
> 
> If you can solve the issues seen in this talk, or you're interested in working with us, get in touch at [evan@cxnpl.com](mailto:evan@cxnpl.com).

## Evan Kohilas
### [`nohumanerrors.com`](https://nohumanerrors.com)

| Conference | Slides | Video | Notes | Length | Year |
|------------|:------:|:-----:|:-----:|-------:|-----:|
| [SydJS]() | [🔗]() | [🔗]() | [🔗]() | 45 min | 2024 |

### Abstract
TODO

### Outline

#### Overview
##### `1-payments-with-integration-test`
- Payments Service
- Payments Controller
- Payments Store
- Payments Controller Integration/End-to-end Tests

#### Mocking the Payment Service
##### `2-service-mock`
- Using vi.mock
- Has no types or auto-complete so you can do anything
- Difficult to refactor and use due to import string
- Doesn’t care about the input of the controller


#### Adding new Payment Service method
##### `3-service-new-method`
- New test fails because of missing method in mock
- This is because vi.<methods> are run by vitest before any code is run
- Effectively, all the mocks are hoisted to the top, and conflict
- This also means that they don’t have the test’s context
- This is because vitest has to monkey-patch the imports to return something else before code can run

#### Workaround using vi.hoisted
##### `4-hoisted-mock`
- Allows for usage of variables within tests
- Is complicated and not a great dev experience
- Can’t use helper functions to alleviate since any vi usage needs to be in the test context

#### Workaround using vi.mocked
##### `5-service-mocked`
- Using vi.mock without a provided factory will mock every export
- We can then import the objects and mock their return values
- vi.mocked isn’t needed! Only there for usage in a typesafe way
- Vitest doesn’t make it obvious that
  - these mock objects are being mutated
  - these mock objects are shared between all tests in the file
- Requires importing the functions which may cause side effects

#### Namespacing the Payment Service
##### `6-service-namespaced`
- Adding clarity to getPayments and getAllPayments
- Using export * as PaymentService
- Maybe not common but it’s is something that we do
- Causes vi.mock to freak out due to recursion
- Maybe a bug with vitest?
- Clearly vi.mock has its issues

#### Spying on the Payment Service
#### `7-service-spied`
- Using vi.spyOn(PaymentService, “findPayment”)
- String argument is typed, but has no support for refactoring
- But it works so lets go with it!

#### Testing the Payment Service
##### `8-service-test`
- Now that we have something that works, lets write a test for the Payment Service 
- Worth noting that it requires importing the object which may cause side effects

#### Isolating tests
##### `9-spy-reset`
- Adding a test to check against the real object
- Just like mock, spies mutate the object
- Unlike mock, spies mutate the real object
- So if you care about your tests being isolated, you need to reset all mocks using vi.resetAllMocks()
- Although Vitest recommends this, it’s not obvious when coding.
- It restores it back to the real implementation

#### Spies and side effects
##### `10-spy-side-effect`
- New method created in Payment Store and used in Payment Service
- Tests still pass, but now they have side effects
- Spies only mock a specific field, unlike mocks which do too much
- Tests using spies can not be aware of changes

#### Adding feature flags as a new dependency
##### `11-feature-flag-use`
- New feature flag dependency added on the end point
- Causes tests to fail
- How can it be mocked out?

#### Testing with feature flags using spies
##### `12-feature-flag-spy`
- Feature flags can’t be blanket mocked to be true or false, as multiple flags can have various values
- Needs to be tested using a fake object for which particular values can be configured
- A getInstance method gives the ability to replace the instance with a faked object
- Vitest has type errors, due to a different object being returned.
- Using vi.mock has similar issues to before with needing to hoist

#### Refactoring to use classes
##### `13-class-refactor`
- Class constructors allow for clean use of dependencies
- Doesn’t have to be classes
- Using vi.importMock to create mocked objects
  - Doesn’t catch unmocked methods
  - Instead default to nothing
  - Also has issues with concurrency?

#### Using mocked objects
##### `14-mockito-injection`
- Using vitest-mock-extended (or jest-mock-extended)
- Created using mockDeep
- Can be setup to throw on a method that’s not mocked
- Now catches when the tested code has new dependencies
- Helpers can be used because it’s normal code

#### Conclusion
- Using monkey-patching from vi.mock and vi.spyOn in tests can be dangerous
- Tests are safest when kept stupid simple and isolated
- Write code to allow for injection of dependencies (that can instead be mocked objects)
- Use mocked objects that fail when called unexpectedly (to catch code changes and avoid side effects)

# App
An example serverless app created with SST.

## Getting Started

[**Read the tutorial**](https://sst.dev/examples/how-to-use-dynamodb-in-your-serverless-app.html)

Install the example.

```bash
$ npx create-sst@latest --template=examples/rest-api-dynamodb
# Or with Yarn
$ yarn create sst --template=examples/rest-api-dynamodb
# Or with PNPM
$ pnpm create sst --template=examples/rest-api-dynamodb
```

## Commands

### `npm run dev`

Starts the Live Lambda Development environment.

### `npm run build`

Build your app and synthesize your stacks.

### `npm run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy, a specific stack.

### `npm run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally removes, a specific stack.

## Documentation

Learn more about the SST.

- [Docs](https://docs.sst.dev/)
- [sst](https://docs.sst.dev/packages/sst)
