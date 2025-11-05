      {/* Our Work Section - Three Cards Design with Case Studies */}
      <section 
        id="work"
        ref={workAnimation.elementRef}
        className={`py-20 bg-muted/20 relative overflow-hidden transition-all duration-1000 ${
          workAnimation.isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-700 delay-200 ${
            workAnimation.isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 px-4 py-2">
              <Briefcase className="w-4 h-4 mr-2" />
              Our Portfolio
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
              Featured 
              <span className="text-primary"> Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our most impactful projects that showcase our expertise in creating 
              innovative software solutions that drive real business results.
            </p>
          </div>

          {/* Three Project Cards */}
          <div 
            ref={workProjectsAnimation.elementRef}
            className="stagger-children"
          >
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ${workProjectsAnimation.isVisible ? 'animate' : ''}`}>
              {featuredProjects.map((project, index) => (
                <Card 
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className="group cursor-pointer overflow-hidden bg-gradient-to-br from-card to-card/90 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Project Visual */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center overflow-hidden">
                    <div className="relative z-10">
                      <Monitor className="w-16 h-16 text-primary/70 group-hover:text-primary transition-colors duration-300 group-hover:scale-110" />
                    </div>
                    
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-4 right-4 bg-card/90 text-foreground border border-white/20 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                    
                    {/* Year Badge */}
                    <Badge className="absolute bottom-4 left-4 bg-primary/20 text-primary">
                      {project.year}
                    </Badge>

                    {/* Floating Elements */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border border-primary/30 rounded-full animate-spin" />
                  </div>

                  <CardContent className="p-8 space-y-6">
                    {/* Project Title */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Result */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-primary">{project.results.metric}</div>
                          <div className="text-sm text-muted-foreground">{project.results.description}</div>
                        </div>
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Tech Stack Preview */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">Built With</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <Badge 
                            key={techIndex}
                            variant="outline" 
                            className="text-xs bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-muted-foreground/20">
                            +{project.tech.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Button 
                      className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 transition-all duration-300 group-hover:border-primary"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
                </Card>
              ))}
            </div>
          </div>

          {/* Case Studies Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">Success Stories</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real client transformations and the measurable impact of our custom software solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((caseStudy, index) => (
                <Card 
                  key={caseStudy.id}
                  onClick={() => handleCaseStudyClick(caseStudy)}
                  className="group cursor-pointer overflow-hidden bg-gradient-to-br from-card to-card/90 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Case Study Header */}
                  <div className="relative h-32 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                    <Building className="w-12 h-12 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                    <Badge className="absolute top-3 right-3 bg-card/90 text-foreground text-xs">
                      {caseStudy.industry}
                    </Badge>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Title */}
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {caseStudy.title}
                    </h4>
                    
                    {/* Subtitle */}
                    <p className="text-sm text-muted-foreground">
                      {caseStudy.subtitle}
                    </p>

                    {/* Key Metrics Preview */}
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <div className="text-center">
                        <div className="font-bold text-primary">{caseStudy.results.metrics[0].value}</div>
                        <div className="text-xs text-muted-foreground">{caseStudy.results.metrics[0].label}</div>
                      </div>
                    </div>

                    {/* Technologies Preview */}
                    <div className="flex flex-wrap gap-1">
                      {caseStudy.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          variant="outline" 
                          className="text-xs bg-primary/5 text-primary border-primary/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {caseStudy.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-muted-foreground/20">
                          +{caseStudy.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Read More Button */}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full text-primary hover:bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      Read Case Study
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {workStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create a custom software solution that delivers exceptional results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-medium hover:scale-105 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/10 px-8 py-3 font-medium"
              >
                View All Projects
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>