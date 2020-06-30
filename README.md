[![Troodon](https://raw.githubusercontent.com/shandysiswandi/troodon/master/_.png)](#)

[![tag](https://img.shields.io/github/v/tag/shandysiswandi/troodon.svg?sort=semver)](https://github.com/shandysiswandi/troodon)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/shandysiswandi/troodon/blob/master/LICENSE)
[![tag](https://img.shields.io/badge/deno->=1.0.0-green.svg)](https://github.com/denoland/deno)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/shandysiswandi/troodon.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/shandysiswandi/troodon/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/shandysiswandi/troodon.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/shandysiswandi/troodon/context:javascript)

## About Dinosaurs

🦖 Troodon is a Library for Deno to Handle Algorithms

## Project Structure

    Troodon             # Project Name
    ├── algorithms      # List of Algorithm
    | └── ...
    ├── examples        # List of Example Algorithm Usage
    │ └── ...
    ├── tests           # List of Algorithm Test
    │ └── ...
    ├── _.jpg           # mascot : Powered by toppng.com and vectorstock.com
    ├── .gitignore
    ├── enums.ts        # list of enum type
    ├── interfaces.ts   # list of interface type
    ├── LICENSE
    ├── mod.ts          # just import this file to use this library
    ├── README.md
    └── utils.ts        # list of function helper

## Features

- [x] [Technique for Order of Preference by Similarity to Ideal Solution / Topsis](https://en.wikipedia.org/wiki/TOPSIS) algorithm.
- [x] [Simple Additive Weighting / SAW](https://bit.ly/Simple_additive_weighting) algorithm.
- [x] [Prime Number / Prime](https://en.wikipedia.org/wiki/Prime_number) algorithm.
- [x] [Leap Year](https://id.wikipedia.org/wiki/Leap_Year) algorithm.
- [x] [Weighted Product Model / WPM](https://en.wikipedia.org/wiki/Weighted_product_model) algorithm.
- [ ] [Analytic Hierarchy Process / AHP](https://en.wikipedia.org/wiki/Analytic_hierarchy_process) algorithm.

## Usage

All the following algorithms modules are exposed in `mod.ts`

## Examples

- [Topsis Example](/examples/topsis.md)
- [SAW Example](/examples/saw.md)
- [Prime Example](/examples/prime.md)
- [Leap Year Example](/examples/leapyear.md)
- [WPM Example](/examples/wpm.md)

## Run Test

    deno test

## License

The Troodon project is open-sourced software licensed under the [MIT license](LICENSE).
