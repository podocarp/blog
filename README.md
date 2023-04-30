My blog

## Code blocks syntax

Code blocks accept some meta properties that change how code is rendered.
The syntax is very simple and error checking is non-existent.

````text
```language[ meta]
```
````

Meta properties are a sequence of space delimited options:

```text
meta = opt1[ opt2...]
```

where options are either a single flag or an assignment to some setting:

```text
opt = flag | setting=value
```

The following options are available:
option | type | accepted values | description
---| --- | --- | ---
`lineno` | flag | - | adds line numbers to entire code block
`bash` | setting | range of line numbers, e.g. 1,3,4 or 1-10 or 4 | adds `~$` to specified lines
`root` | setting | range of line numbers, e.g. 1,3,4 or 1-10 or 4 | adds `~#` to specified lines
`path` | setting | string | adds a header containing the path to codeblocks, useful for specifying filenames
