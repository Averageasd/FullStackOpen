function App() {
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Course test",
          exercises: 3,
          id: 4,
        },
        {
          name: "Advanced course",
          exercises: 5,
          id: 5,
        },
      ],
    },
    {
      id: 2,
      name: "Node.js",
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Courses courses={courses}></Courses>
    </div>
  );
}

const Courses = (props) => {
  const { courses } = props;
  return (
    <ul>
      {courses.map((singleCourse) => {
        return (
          <SingleCourse
            key={singleCourse.id}
            singleCourse={singleCourse}
          ></SingleCourse>
        );
      })}
    </ul>
  );
};

const SingleCourse = (props) => {
  const { singleCourse } = props;
  return (
    <li>
      <div>
        <Header singleCourse={singleCourse}></Header>
        <Content singleCourse={singleCourse}></Content>
        <Total singleCourse={singleCourse}></Total>
      </div>
    </li>
  );
};

const Header = (props) => {
  const { singleCourse } = props;
  return <h1>{singleCourse.name}</h1>;
};

const Content = (props) => {
  const { singleCourse } = props;
  const { parts } = singleCourse;
  return (
    <div>
      <ul>
        {parts.map((part) => {
          return <Part key={part.id} part={part}></Part>;
        })}
      </ul>
    </div>
  );
};

const Part = (props) => {
  const { part } = props;
  const { name, exercises } = part;
  return (
    <li>
      <p>
        {name} {exercises}
      </p>
    </li>
  );
};

const Total = (props) => {
  const { singleCourse } = props;
  const { parts } = singleCourse;
  return <h4>Number of exercises {getTotal()}</h4>;

  function getTotal() {
    let s = 0;
    for (const c of parts) {
      s += c.exercises;
    }
    return s;
  }
};

export default App;
