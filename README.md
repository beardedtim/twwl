# This Week We Learned

> Let's learn something together

## Overview

`This Week We Learned`, or `TWWL`, is my personal education blog/hub.
It is meant to allow me to publish things that I have learned. The
code is open-sourced so that others may use and host their own versions
of educational content.

## Architecture Philosophy

`TWWL`'s software architecture is my chance to explore what "Clean Code"
might mean, how we might want to structure the systems that we use, and
what we might call them.

I am leaning _heavily_ on those before me that have explained the
[Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/),
the [Layerd Architecture](https://dzone.com/articles/layered-architecture-is-good),
the [Hexagonal Architecture](https://blog.ndepend.com/hexagonal-architecture/), and
the [Ports/Adapters Architecture](https://herbertograca.com/2017/09/14/ports-adapters-architecture/).

The _idea_ that I feel they all convey is one of making _future changes_ easy by
decoupling things. This _decoupling_ makes things _today_ harder/longer/more verbose
in exchange for allowing the _ease_ of change _tomorrow_.

The approach to the above that `TWWL` is taking is to first abstract the _idea_
of inputs into the system. These would be analogous to the `Ports` in the above
architectures. We might have an `HTTP` Port that is responsible for handling
HTTP requests on a system.

Any given _node_ or _computer_ or _Worker_ that we have may have N amount
of these Inputs.
